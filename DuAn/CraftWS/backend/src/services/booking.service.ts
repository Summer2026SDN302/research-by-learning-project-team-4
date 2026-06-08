import Timeslot from '../models/timeslot.model';
import Booking from '../models/booking.model';
import Workshop from '../models/workshop.model';
import { v4 as uuidv4 } from 'uuid';

export class BookingService {
  /**
   * Tạo booking với chống overbooking bằng atomic update
   */
  static async createBooking(touristId: string, timeslotId: string, quantity: number) {
    // Atomic update: chỉ thành công nếu availableSlots >= quantity
    const timeslot = await Timeslot.findOneAndUpdate(
      {
        _id: timeslotId,
        availableSlots: { $gte: quantity },
        status: 'AVAILABLE',
      },
      {
        $inc: {
          bookedSlots: quantity,
          availableSlots: -quantity,
        },
      },
      { new: true }
    );

    if (!timeslot) {
      throw new Error('Không đủ chỗ trống hoặc khung giờ không khả dụng');
    }

    // Nếu hết chỗ thì cập nhật status FULL
    if (timeslot.availableSlots === 0) {
      timeslot.status = 'FULL';
      await timeslot.save();
    }

    const workshop = await Workshop.findById(timeslot.workshopId);
    if (!workshop) throw new Error('Workshop không tồn tại');

    const bookingCode = `BK-${Date.now()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const unitPrice = timeslot.price;
    const totalPrice = unitPrice * quantity;

    const booking = await Booking.create({
      bookingCode,
      touristId,
      workshopId: timeslot.workshopId,
      timeslotId: timeslot._id,
      hostId: timeslot.hostId,
      quantity,
      unitPrice,
      totalPrice,
      bookingStatus: 'PENDING',
    });

    // Tăng totalBookings cho workshop
    await Workshop.findByIdAndUpdate(timeslot.workshopId, {
      $inc: { totalBookings: quantity },
    });

    return booking;
  }
}
