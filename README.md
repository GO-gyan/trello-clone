## Overview 
This project is a clone of Trello, featuring a range of functionalities for task and project management. It's built using Next.js v14 and incorporates various technologies such as Clerk for authentication, MySQL with Prisma for the database, and shadcnUI & TailwindCSS for the user interface. 
## Features  
-  **Authentication:** Users can securely log in using Clerk authentication. 
-   **Organizations/Workspaces:** Users can organize their boards within workspaces. 
-  **Board Management:**  
	 - Create, rename, and delete boards. 
	 -  Set a beautiful cover image using the Unsplash API. 
-  **Activity Log:** Track and view the activity log for each organization. 
-   **Lists Management:**  
	 - Create, rename, and delete lists. 
	 - Reorder lists via drag & drop. 
-  **Card Management:**  
	-  Create, rename, and delete cards. 
	-  Reorder cards via drag & drop. 
	-  Copy cards for easy duplication. 
-  **Card Details:**  
	-  Add descriptions to cards. 
	-  View and manage activity logs for each card. 
-  **Board Limits:** Enforce board limits for each organization. 
-  **Stripe Integration:** Enable Stripe subscriptions for unlocking unlimited boards. 
-  **Landing Page:** A visually appealing landing page for users. 
## Tech Stack  
-  **Next.js v14:** The foundation for building React applications.
-  **Clerk:** Used for secure authentication. 
-  **MySQL & Prisma ORM:** For database management. 
-  **shadcnUI & TailwindCSS:** UI frameworks for styling and design. 
## Getting Started  
1.  **Clone the repository:**  
```bash
git clone https://github.com/your-username/trello-clone.git cd trello-clone
```
2. **Install dependencies:**
```bash
npm install
```
3. **Set up environment variables:**
-   Create a `.env` file based on the provided `.env.example`.
-   Fill in the required values for Clerk, Unsplash, Stripe, and database configurations.
4. **Run the development server:**
```bash
npm run dev
```
