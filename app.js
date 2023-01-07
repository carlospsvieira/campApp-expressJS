if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');

//mongo connection to default port
const dbUrl = 'mongodb://localhost:27017/campApp';
mongoose.connect(dbUrl);

// connects ejs to view engine directory
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parse requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(mongoSanitize({
  replaceWith: '_'
}))

// session and flash messages set up
const sessionConfig = {
  name: 'session',
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use(flash());

// passport set up
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware parsing all requests
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  req.session.returnTo = req.originalUrl
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// routes prefix
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

// home route
app.get('/', (req, res) => {
  res.render('home')
});

// not found //
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// error msg and status //
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something Went Wrong!'
  res.status(statusCode).render('error', { err });
});


app.listen(3000); // express listening to localhost 3000

