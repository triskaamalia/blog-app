const config ={
mongo: {
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    maxPoolSize: 50,
    autoIndex: false,
    retryWrites: false
  },
  url : 'mongodb+srv://triskaamalia:triska12345@cluster0.fxzi9p0.mongodb.net/?retryWrites=true&w=majority'
  },
  server : {
    host : 'localhost',
    port : 1337
  }
}

export default config;