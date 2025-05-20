// server.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend

// Set up session middleware
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Dummy users (admin + user with plain text passwords for demo)
const users = [
  { username: 'user', password: bcrypt.hashSync('user123', 10), role: 'user' },
  { username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'admin' },
];

// Dummy book data (merged both of your lists for variety)
const books = [
  { id: 1,
    title: 'The Book of Joy',
    author: 'Dalai Lama, Desmond Tutu',
    genre: 'Nonfiction',
    cover: 'https://covers.openlibrary.org/b/id/12345716-L.jpg'
  },
  { id: 2, title: 'Where the Crawdads Sing', author: 'Delia Owens', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/9875836-L.jpg', description: 'A coming-of-age story set in the marshes of North Carolina.' },
  { id: 3, title: 'The Night Circus', author: 'Erin Morgenstern', genre: 'Fantasy', cover: 'https://covers.openlibrary.org/b/id/8225262-L.jpg', description: 'A magical competition between two young illusionists at a mysterious circus.' },
  { id: 4, title: 'Educated', author: 'Tara Westover', genre: 'Non-Fiction', cover: 'https://covers.openlibrary.org/b/id/9250635-L.jpg', description: 'A memoir about a woman who grows up in a strict and abusive household in rural Idaho but eventually escapes to learn about the wider world through education.' },
  { id: 5, title: 'Atomic Habits', author: 'James Clear', genre: 'Non-Fiction', cover: 'https://covers.openlibrary.org/b/id/9615070-L.jpg', description: 'An easy & proven way to build good habits and break bad ones.' },
  { id: 6, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/10545160-L.jpg', description: 'A novel set in the Jazz Age that critiques the American Dream.' },
  { id: 7, title: '1984', author: 'George Orwell', genre: 'Sci-Fi', cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg', description: 'A dystopian novel about totalitarianism and surveillance.' },
  { id: 8, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', cover: 'https://covers.openlibrary.org/b/id/6979861-L.jpg', description: 'A fantasy adventure that follows Bilbo Baggins, a hobbit who embarks on a quest.' },
  { id: 9, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg', description: 'A novel about racial injustice in the Deep South.' },
  { id: 10, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Sci-Fi', cover: 'https://covers.openlibrary.org/b/id/11131359-L.jpg', description: 'A lone astronaut must save humanity from disaster.' },
  // Additional 25 books with details
  { id: 11, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/11111111-L.jpg', description: 'A novel about following your dreams and listening to your heart.' },
  { id: 12, title: 'Becoming', author: 'Michelle Obama', genre: 'Non-Fiction', cover: 'https://covers.openlibrary.org/b/id/22222222-L.jpg', description: 'A memoir by the former First Lady of the United States.' },
  { id: 13, title: 'The Book Thief', author: 'Markus Zusak', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/33333333-L.jpg', description: 'A story narrated by Death about a young girl in Nazi Germany.' },
  { id: 14, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/44444444-L.jpg', description: 'A novel about teenage alienation and loss.' },
  { id: 15, title: 'The Great Alone', author: 'Kristin Hannah', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/55555555-L.jpg', description: 'A family struggles to survive in the wilderness of Alaska.' },
  { id: 16, title: 'The Invisible Man', author: 'H.G. Wells', genre: 'Sci-Fi', cover: 'https://covers.openlibrary.org/b/id/66666666-L.jpg', description: 'A scientist discovers a way to become invisible but struggles with the consequences.' },
  { id: 17, title: 'The Girl on the Train', author: 'Paula Hawkins', genre: 'Mystery', cover: 'https://covers.openlibrary.org/b/id/77777777-L.jpg', description: 'A psychological thriller that unravels the mystery of a missing person.' },
  { id: 18, title: 'Little Fires Everywhere', author: 'Celeste Ng', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/88888888-L.jpg', description: 'A story about motherhood, privilege, and the secrets we keep.' },
  { id: 19, title: 'The Martian', author: 'Andy Weir', genre: 'Sci-Fi', cover: 'https://covers.openlibrary.org/b/id/99999999-L.jpg', description: 'An astronaut becomes stranded on Mars and must survive.' },
  { id: 20, title: 'The Power of Habit', author: 'Charles Duhigg', genre: 'Non-Fiction', cover: 'https://covers.openlibrary.org/b/id/10101010-L.jpg', description: 'An exploration of the science behind habit formation.' },
  { id: 21, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', genre: 'Non-Fiction', cover: 'https://covers.openlibrary.org/b/id/11111112-L.jpg', description: 'A thought-provoking history of our species.' },
  { id: 22, title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Non-Fiction', cover: 'https://covers.openlibrary.org/b/id/11111113-L.jpg', description: 'An overview of cosmology from the Big Bang to black holes.' },
  { id: 23, title: 'The Fault in Our Stars', author: 'John Green', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/11111114-L.jpg', description: 'A love story between two teens who meet at a cancer support group.' },
  { id: 24, title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/11111115-L.jpg', description: 'A dystopian novel where children are chosen to fight to the death.' },
  { id: 25, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', cover: 'https://covers.openlibrary.org/b/id/11111116-L.jpg', description: 'A science fiction epic set on a desert planet.' },
  { id: 26, title: 'The Handmaid\'s Tale', author: 'Margaret Atwood', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/11111117-L.jpg', description: 'A dystopian novel about a totalitarian society.' },
  { id: 27, title: 'The Road', author: 'Cormac McCarthy', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/11111118-L.jpg', description: 'A post-apocalyptic novel about a father and son.' },
  { id: 28, title: 'The Da Vinci Code', author: 'Dan Brown', genre: 'Mystery', cover: 'https://covers.openlibrary.org/b/id/11111119-L.jpg', description: 'A mystery thriller that explores religious symbology.' },
  { id: 29, title: 'Gone Girl', author: 'Gillian Flynn', genre: 'Mystery', cover: 'https://covers.openlibrary.org/b/id/11111120-L.jpg', description: 'A psychological thriller about a marriage gone wrong.' },
  { id: 30, title: 'The Kite Runner', author: 'Khaled Hosseini', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/11111121-L.jpg', description: 'A story of friendship and redemption in Afghanistan.' },
  { id: 31, title: 'The Nightingale', author: 'Kristin Hannah', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/11111122-L.jpg', description: 'A tale of two sisters in World War II France.' },
  { id: 32, title: 'The Book of Joy', author: 'Dalai Lama & Desmond Tutu', genre: 'Non-Fiction', cover: 'https://covers.openlibrary.org/b/id/11111123-L.jpg', description: 'A conversation between two spiritual leaders about finding joy.' },
  { id: 33, title: 'A Gentleman in Moscow', author: 'Amor Towles', genre: 'Fiction', cover: 'https://covers.openlibrary.org/b/id/11111124-L.jpg', description: 'A novel about a man sentenced to house arrest in a luxury hotel.' },
  { id: 34, title: 'Educated', author: 'Tara Westover', genre: 'Non-Fiction', cover: 'https://covers.openlibrary.org/b/id/11111125-L.jpg', description: 'A memoir about a woman who grows up in a strict and abusive household.' },
  { id: 35, title: 'The Silent Patient', author: 'Alex Michaelides', genre: 'Mystery', cover: 'https://covers.openlibrary.org/b/id/11111126-L.jpg', description: 'A psychological thriller about a woman who stops speaking after committing a violent crime.' },
];




// Routes

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role: 'user' });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route (with session)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    req.session.user = { username: user.username, role: user.role };
    res.json({ message: 'Login successful', role: user.role });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

// Logout route
app.get('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Failed to log out' });
    res.json({ message: 'Logged out successfully' });
  });
});

// Profile route (session protected)
app.get('/api/profile', (req, res) => {
  if (req.session.user) {
    res.json({ username: req.session.user.username, role: req.session.user.role });
  } else {
    res.status(401).json({ message: 'User not logged in' });
  }
});

// Get books
app.get('/api/books', (req, res) => res.json(books));

// Add book
app.post('/api/addbook', (req, res) => {
  const { title, author, genre, cover } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    cover: cover || '', // Optional
  };
  books.push(newBook);
  res.json({ success: true, book: newBook });
});
// Delete book
app.delete('/api/deletebook/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Book not found' });
  }
});

// Start server (only one listen call)
app.listen(5000, () => console.log('Server running on http://localhost:5000'));