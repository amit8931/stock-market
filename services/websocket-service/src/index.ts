import { Server } from 'socket.io';
import config from '@stock-platform/config';
import { WebSocketMessage } from '@stock-platform/shared-types';

class WebSocketService {
  private io: Server;

  constructor() {
    this.io = new Server(3004, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
  }

  initialize() {
    this.io.on('connection', (socket) => {
      console.log(`📡 Client connected: ${socket.id}`);

      // Handle price updates
      socket.on('subscribe_price', (data: { symbol: string }) => {
        socket.join(`price:${data.symbol}`);
        console.log(`Subscribed to price updates for ${data.symbol}`);
      });

      // Handle signal updates
      socket.on('subscribe_signals', (data: { symbol: string }) => {
        socket.join(`signals:${data.symbol}`);
        console.log(`Subscribed to signals for ${data.symbol}`);
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        console.log(`📡 Client disconnected: ${socket.id}`);
      });
    });
  }

  // Broadcast price update
  broadcastPriceUpdate(symbol: string, data: any) {
    const message: WebSocketMessage = {
      type: 'price_update',
      data,
      timestamp: new Date(),
    };

    this.io.to(`price:${symbol}`).emit('price_update', message);
  }

  // Broadcast signal update
  broadcastSignalUpdate(symbol: string, data: any) {
    const message: WebSocketMessage = {
      type: 'signal_update',
      data,
      timestamp: new Date(),
    };

    this.io.to(`signals:${symbol}`).emit('signal_update', message);
  }

  // Broadcast news alert
  broadcastNewsAlert(symbol: string, data: any) {
    const message: WebSocketMessage = {
      type: 'news_alert',
      data,
      timestamp: new Date(),
    };

    this.io.to(`price:${symbol}`).emit('news_alert', message);
  }

  // Broadcast market brief
  broadcastMarketBrief(data: any) {
    const message: WebSocketMessage = {
      type: 'market_brief',
      data,
      timestamp: new Date(),
    };

    this.io.emit('market_brief', message);
  }

  getIO() {
    return this.io;
  }
}

const websocketService = new WebSocketService();
websocketService.initialize();

console.log('🚀 WebSocket Service running on port 3004');

export default websocketService;
