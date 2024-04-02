# 📝 Notetaker

Note-taking is an intuitive web app created to help you manage and organize your notes. It's created with T3 Stack in order to learn how Next.js and tRPC work together and help me better understand how to create a fully operational app with React and Typescript ensuring type safety between frontend and backend.

## 🛠️ Technologies and tools

- `React`
- `Next.js`
- `NextAuth.js`
- `Tanstack query`
- `Prisma`
- `tRPC`
- `Tailwind CSS`
- `shadcn/ui`
- `Vercel`

## 🦄 Features

- **User-Friendly Interface:** Intuitive design with shadcn/ui components and Tailwind makes this app really easy to use
- **Create note:** You can create your note by providing a title and note content
- **Edit/Delete note:** Option to easily edit and delete your notes to keep them organized and up-to-date
- **Create folders**: Besides the default Notes folder, users can create additional folders to better organize their notes
- **Responsive design**: Enjoy this app whether you are using a mobile device or a computer

## 📚 What I Learned

### Next.js and NextAuth
As I didn't have much experience with Next.js this was a great opportunity to learn key concepts of this fully-fledged framework and leverage its capabilities. Combined with `NextAuth.js` I was able to seamlessly integrate authentication and session management with Google provider and ensure that data is safe and secure in the database.

### Type safety
I wanted to ensure that the entire app is type-safe whether it is frontend or backend. Using Prisma ORM - connected to Supabase, and tRPC for remote procedure calls I got what I wanted. Also, I used the Tanstack query to manage server data fetching, caching, and synchronization with the UI components. Utilizing Tanstack query's automatic query invalidation and refetching based on mutation responses helped me to update data whenever there was a deleted or updated note.

### 🪴 Overall
Developing the Notetaker Web App with the T3 tech stack provided me with a good learning experience in building modern, scalable, and secure web applications. I gained valuable insights into leveraging these technologies to enhance the building process, improve my overall knowledge about building full stack applications, and ensure good performance of my app.

## 💡 Improvements

- Even though the app does have a responsive design it could be improved
- Add Search functionality to quickly find your notes
- Add support for markdown notes
- Ensure that note title and note content are fully encrypted in our database so no one can read them except the user that created them
- Creation of custom login page
- Password protected notes/folders

## 🚦 Running the Project

To run this project in your local development environment, follow these steps:

1. Clone this repository
2. Run `npm install` to install all necessary dependencies
3. Create `.env` file and provide your credentials as shown in the `.env.example` file
4. Run `npm run dev` to start development server
5. Access the application in your web browser at http://localhost:3000

## 🔍 Demo

<details> 
  <summary><h3>🎥 Video</h3></summary>

  #

https://github.com/djojov/notetaker-t3/assets/55921742/a904fe03-188c-4e3c-9c4e-6208aac4404e

</details>

<details> 
  <summary><h3>📸 Images</h3></summary>

  #

![chrome_BkCqslBsvB](https://github.com/djojov/notetaker-t3/assets/55921742/c5e52199-6956-4f9c-a43f-015c24be77ff)
![chrome_i1AulTAxQA](https://github.com/djojov/notetaker-t3/assets/55921742/73567205-7ca8-4151-9f64-de9451e74a76)
![chrome_AsfK0yPB1K](https://github.com/djojov/notetaker-t3/assets/55921742/01b4c19f-971d-432e-b53b-c83e18a61109)
![chrome_QhF82JP0jk](https://github.com/djojov/notetaker-t3/assets/55921742/5f5ca420-a694-4c09-94cd-1b0a5dee9ae4)
![chrome_Kv9ZI6bBHU](https://github.com/djojov/notetaker-t3/assets/55921742/480d2b6b-d81a-4458-ab0e-47deb88c51ca)
![chrome_JW0p2PE1dx](https://github.com/djojov/notetaker-t3/assets/55921742/d6b21e40-f7b8-4677-9181-8c90287c3faf)

