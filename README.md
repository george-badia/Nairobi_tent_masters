# Nairobi Tent Masters - E-Commerce & Custom Order Platform

![Nairobi Tent Masters Hero](https://picsum.photos/seed/hero/1200/600)

**Nairobi Tent Masters** is a modern, full-featured web application for a premier tent manufacturing business based in Nairobi, Kenya. It provides a seamless user experience for customers to browse and purchase ready-made tents, design custom solutions with AI assistance, and explore a gallery of past work. The application also includes a secure, password-protected admin dashboard for comprehensive product and order management.

This project was built to showcase a modern frontend stack, great UI/UX design, and integration with generative AI for a practical business use case.

---

## ✨ Features

- **Interactive Home Page**: A beautiful landing page featuring a hero section, company specialties, featured products, a dynamic testimonial slider, and an FAQ section.
- **E-Commerce Shop**: A clean, filterable shop page where customers can browse products by category, add items to a persistent shopping cart, and manage their selections.
- **AI-Powered Custom Orders**: A unique feature allowing users to describe their ideal tent. The app then uses the Gemini API to generate a detailed proposal, including a summary, material recommendations, and a price estimate.
- **Proposal Submission**: Customers can submit their AI-generated proposals along with their contact details, which are then viewable by the administrator.
- **Stunning Gallery**: A portfolio of past work displayed in a modern, responsive masonry grid with category filters and a lightbox for detailed project stories.
- **Secure Admin Panel**: A password-protected dashboard for administrators to perform CRUD (Create, Read, Update, Delete) operations on products.
- **Admin Order Management**: Admins can view and manage all custom order submissions from customers, with pagination for easy browsing.
- **Responsive Design**: Fully responsive layout that looks great on desktops, tablets, and mobile devices.

---

## 🔧 Technologies Used

This project is built with a modern, performant, and scalable tech stack:

- **Frontend Framework**: [React](https://reactjs.org/) (using Hooks and Context API for state management)
- **AI Integration**: [@google/genai (Gemini API)](https://ai.google.dev/) for custom proposal generation.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first styling.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.
- **Icons**: Custom SVG icons implemented as React components.
- **Development Environment**: Relies on modern browser ES Module support via an `importmap`. No complex bundler setup is needed for this project structure.

---

## ⚙️ Setup and Installation

To get this project running locally, follow these steps:

**1. Prerequisites:**
   - A modern web browser (e.g., Chrome, Firefox, Edge).
   - A code editor (e.g., [VS Code](https://code.visualstudio.com/)).
   - A local web server to serve the files. The [Live Server extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) is a great option.

**2. Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/nairobi-tent-masters.git
   cd nairobi-tent-masters
   ```

**3. Set up Environment Variables:**
   This project requires an API key for the Google Gemini API to power the custom order feature.

   - **Crucially, the application expects the API key to be available in the browser's environment**. In this project's `index.html`, this is simulated for development purposes.
   - For your local setup, you need to create a mechanism to provide this key. A simple way is to create a `.env` file (which should NOT be committed to git).
   - Create a new file named `.env` in the root of the project.
   - Copy the content from `.env.example` into your new `.env` file.
   - Obtain your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
   - Add your API key to the `.env` file:
     ```
     API_KEY=your_super_secret_api_key_here
     ```
   **Important**: The application code as provided by the prompt expects `process.env.API_KEY` to be defined. In a real production deployment, this key must be managed securely and should not be exposed on the client-side. The current setup is for demonstration and local development only.

**4. Run the Project:**
   - If you are using the **Live Server** extension in VS Code, simply right-click the `index.html` file and select "Open with Live Server".
   - Alternatively, serve the project root directory using any local web server.

---

## 🚀 How to Use the Application

### Customer View

1.  **Home Page**: Explore the company's offerings, featured products, and read testimonials.
2.  **Shop**: Click on "Shop" to browse all available products. Filter by category and add items to your cart.
3.  **Custom Orders**: Navigate to "Custom Orders" to design a unique tent. Describe your needs, generate an AI proposal, and submit it with your contact details for a follow-up.
4.  **Gallery**: Visit the "Gallery" to see beautiful images of past projects.

### Admin View

1.  **Login**: Click on "Admin Panel" in the header. You will be redirected to a login page.
2.  **Enter Password**: The default password for this demonstration is `admin123`.
3.  **Manage Products**: Once logged in, you can add new products, edit existing ones, or delete them from the store. The product list is paginated for easy navigation.
4.  **Review Submissions**: Scroll down to view all custom order proposals submitted by customers. This section is also paginated.
5.  **Logout**: Click the "Logout" button to securely end your admin session.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📞 Support and Contact Details

For any issues, questions, or feedback regarding this project, please open an issue on the GitHub repository where this project is hosted.
