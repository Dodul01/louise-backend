import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

// Common Add date and time to any notification
const enrichNotification = (notification: any) => {
    const now = new Date();

    return {
        ...notification,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
    }
}

// Helper: send notification to a specific user
export const sendUserNotification = (
    io: Server,
    userId: string,
    notification: any
) => {
    const enrichedNotification = enrichNotification(notification);
    io.to(userId).emit("notification", enrichedNotification);
}

// Helper: Send notification to all admins
export const sendAdminNotification = (io: Server, notification: any) => {
    const enrichedNotification = enrichNotification(notification);
    io.to('admin').emit('notification', enrichedNotification);
};

const socketIo = (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        try {
            const userId = socket.handshake.auth?.userId;
            const isAdmin = socket.handshake.auth?.role === 'admin';

            if (userId && isAdmin) {
                socket.join(userId);
            }




            // Disconnect
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('test-notification', (data: any) => {
                sendUserNotification(io, userId, {
                    title: 'Test Notification',
                    message: data?.message || 'This is a test notification',
                    type: 'info'
                });

                sendAdminNotification(io, {
                    title: 'Test Notification',
                    message: data?.message || 'This is a test notification',
                    type: 'info'
                });
            })
        } catch (err) {
            console.log('socket.io connection  error ', err);
        }
    });

    return io;
}

export default socketIo;