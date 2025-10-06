/* Demo script for Login / Signup pages
	 - Adds client-side validation
	 - Show/hide password toggles
	 - Simple demo auth using localStorage (NOT for production)
	 - Toast notifications
*/

console.log("Script loaded successfully");

function toast(message, ms = 3000) {
	let t = document.createElement('div');
	t.className = 'toast';
	t.textContent = message;
	document.body.appendChild(t);
	// small delay to allow transition
	requestAnimationFrame(() => t.classList.add('show'));
	setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, ms);
}

// Toggle password fields
document.querySelectorAll('.toggle-password').forEach(btn => {
	btn.addEventListener('click', () => {
		const targetId = btn.dataset.target;
		const input = document.getElementById(targetId);
		if (!input) return;
		if (input.type === 'password') { input.type = 'text'; btn.textContent = 'Hide'; }
		else { input.type = 'password'; btn.textContent = 'Show'; }
	});
});

// Helper: save user to localStorage (demo only)
function saveUser(username, password) {
	const users = JSON.parse(localStorage.getItem('demo_users') || '{}');
	users[username] = { password };
	localStorage.setItem('demo_users', JSON.stringify(users));
}

function checkUser(username, password) {
	const users = JSON.parse(localStorage.getItem('demo_users') || '{}');
	return users[username] && users[username].password === password;
}

// Signup form handling
const signup = document.getElementById('signupForm');
if (signup) {
	signup.addEventListener('submit', (e) => {
		e.preventDefault();
		const u = document.getElementById('signup-username').value.trim();
		const p = document.getElementById('signup-password').value;
		const p2 = document.getElementById('signup-password2').value;
		if (!u || !p) return toast('Please provide username and password');
		if (p.length < 6) return toast('Password must be at least 6 characters');
		if (p !== p2) return toast('Passwords do not match');
		saveUser(u, p);
		toast('Account created — you can now log in');
		setTimeout(() => { window.location.href = './Login.html'; }, 900);
	});
}

// Login form handling
const login = document.getElementById('loginForm');
if (login) {
	login.addEventListener('submit', (e) => {
		e.preventDefault();
		const u = document.getElementById('login-username').value.trim();
		const p = document.getElementById('login-password').value;
		if (!u || !p) return toast('Please enter username and password');
		if (checkUser(u, p)) {
			toast('Login successful — welcome ' + u + '!');
			// demo: set a flag and redirect to home
			localStorage.setItem('demo_logged_in_user', u);
			setTimeout(() => { window.location.href = './index.html'; }, 900);
		} else {
			toast('Invalid credentials');
		}
	});
}

// If on index page, show a small welcome if logged in
document.addEventListener('DOMContentLoaded', () => {
	const user = localStorage.getItem('demo_logged_in_user');
	if (user) {
		// small non-intrusive toast
		toast('Welcome back, ' + user, 2500);
	}
});

