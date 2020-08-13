import App from './loaders/App';

class Server {
  public static async start() {
    await App.loadServer();
  }
}

Server.start();
