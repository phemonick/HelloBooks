import express from 'express';
import controller from '../controllers';
import fieldValidationMiddleware from '../controllers/middleware/fieldValidations';
import nullvalidationMiddleware from '../controllers/middleware/nullValidation';
import decodeToken from '../controllers/middleware/authenticate';

const authdecodeToken = decodeToken.decodeToken;
const Router = express.Router();
const UserController = controller.User;
const BooksController = controller.Books;
const UserBooksController = controller.UserBooks;
const CategoryController = controller.Category;
const NotificationsController = controller.Notifications;

Router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to the Hello Books!' }));

Router.get('/auth/books/recentbooks', BooksController.getAllBooks);

Router.post('/auth/users/signup', fieldValidationMiddleware, nullvalidationMiddleware, UserController.create);

Router.post('/auth/users/signin', nullvalidationMiddleware, UserController.signIn);

Router.post('/books', nullvalidationMiddleware, BooksController.createBook);

Router.put('/books/:bookId', nullvalidationMiddleware, BooksController.updateBook);

Router.get('/books/', BooksController.getAllBooks);

Router.post('/users/loanbook', authdecodeToken, UserBooksController.loanBook);

Router.put('/users/returnbook', authdecodeToken, UserBooksController.returnBook);

Router.get('/users/getloanhistory', authdecodeToken, UserBooksController.getLoanHistory);

Router.get('/users/getoverduebooks', authdecodeToken, UserBooksController.getOverdueBooks);

Router.get('/users/borrowedbooks', authdecodeToken, UserBooksController.getBorrowedBookList);

Router.post('/admin/category', authdecodeToken, nullvalidationMiddleware, CategoryController.addCategory);

Router.delete('/admin/category/:categoryId', CategoryController.deleteCategory);

Router.put('/admin/category/:categoryId', nullvalidationMiddleware, CategoryController.editCategory);

Router.get('/books/listcategories', authdecodeToken, CategoryController.listCategories);

Router.get('/books/category/:categoryId', authdecodeToken, CategoryController.displayBookwithCategories);

Router.get('/books/search', authdecodeToken, BooksController.searchBooks);

Router.get('/books/:bookId', authdecodeToken, BooksController.viewBook);

Router.delete('/admin/books/:bookId', authdecodeToken, BooksController.deleteBook);

Router.get('/admin/notifications', authdecodeToken, NotificationsController.displayNotification);

Router.put('/users/changepassword', nullvalidationMiddleware, authdecodeToken, UserController.changePassword);

Router.put('/admin/changeuserlevel', UserController.changeLevel);

export default Router;
