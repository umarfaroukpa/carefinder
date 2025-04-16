# CareFinder

![CareFinder Logo](/logo.png)

## Overview

CareFinder is a comprehensive web application designed to help users find and book hospitals in Nigeria. The platform simplifies the process of locating healthcare facilities, comparing services, and booking appointments.

## Features

- **Hospital Search**: Find hospitals based on location, services, and specialties
- **Detailed Hospital Information**: View comprehensive details about each hospital
- **User Authentication**: Secure login and registration system
- **Role-Based Access Control**: Different permissions for users, moderators, and administrators
- **Mobile Responsive Design**: Seamless experience across all devices
- **Share Functionality**: Easily share hospital lists with others
- **User Reviews and Ratings**: Make informed decisions based on others' experiences

## Technology Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Mongodb, Firebase (Authentication, Firestore, Storage)
- **State Management**: React Context API
- **Styling**: Tailwind CSS, Custom Components
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/carefinder.git
   cd carefinder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:3000

## Project Structure

```
carefinder/
├── app/                  # Next.js app directory
│   ├── errorRout/        # Error handling components
│   ├── hospitalsearch/   # Hospital search page
│   ├── index.tsx         # Home page
│   └── layout.tsx        # Root layout with providers
├── component/            # Reusable components
│   ├── auth/             # Authentication components
│   │   ├── AuthContext.tsx    # Authentication context provider
│   │   ├── AuthProvider.tsx   # Auth provider with loading state
│   │   └── ProtectedRoute.tsx # Route protection component
│   ├── Header.tsx        # Site header
│   ├── Footer.tsx        # Site footer
│   ├── HospitalList.tsx  # Hospital results display
│   ├── HeroSection.tsx   # Homepage hero section
│   └── ...               # Other UI components
├── lib/                  # Utility functions and libraries
│   └── firebase.ts       # Firebase configuration
├── types/                # TypeScript type definitions
│   └── Hospital.ts       # Hospital interface
└── styles/               # Global styles
    └── globals.css       # Global CSS
```

## Authentication and Authorization

CareFinder implements a comprehensive authentication system with three user roles:

- **User**: Can search for hospitals and book appointments
- **Moderator**: Additional capabilities to manage hospital listings
- **Admin**: Full access to all system features and user management

Protected routes ensure that users can only access features appropriate for their role.

## Components

### Authentication Components

- **AuthContext**: Manages authentication state across the application
- **AuthProvider**: Handles user authentication flow with loading states
- **ProtectedRoute**: Restricts access to routes based on authentication status and user roles

### UI Components

- **HospitalSearch**: Advanced search interface for finding hospitals
- **HospitalList**: Displays search results in a user-friendly format
- **ShareButton**: Allows users to share hospital lists
- **Features**: Highlights key application features
- **Testimonials**: Displays user testimonials and success stories

## Deployment

The application is configured for deployment on Vercel, Netlify, or any other Next.js-compatible hosting service.

To deploy:

1. Connect your repository to your hosting service
2. Configure the environment variables
3. Deploy the application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or issues, please open an issue on GitHub or contact the development team.

---

© 2025 CareFinder. All Rights Reserved.