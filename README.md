# Naap - Tailor Shop Management System

**Naap** (ناپ) is a comprehensive web application for tailor shops to manage customer measurements, details, and order tracking. The name "Naap" comes from the Urdu word meaning "measurement," reflecting the app's core purpose of managing tailor measurements and customer records.

## 🌟 Features

### Customer Management

- **Customer Profiles**: Store customer details including name, phone number, and notes
- **Measurement Records**: Manage detailed measurement records for each customer
- **Search & Filter**: Quickly find customers by name or phone number

### Image Management

- **Photo Storage**: Upload and store reference images for each customer's measurements
- **Cloudinary Integration**: Secure cloud storage for all images
- **Zoomable Images**: Interactive image viewing with pinch-to-zoom functionality

### Order Tracking

- **Order History**: Track completed and pending orders
- **Notes Section**: Add detailed notes for each customer's preferences and requirements
- **Creation Timestamps**: Automatic tracking of when records were created

### Security & Authentication

- **Google OAuth**: Secure login using Google authentication
- **Protected Routes**: Customer data accessible only to authenticated users
- **User-specific Data**: Each user sees only their own customer records

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Firebase project with Authentication and Firestore enabled
- Cloudinary account for image storage

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd naap
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file with your Firebase and Cloudinary credentials:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Adding a New Customer (Naap)

1. Click the "Create Naap" button
2. Enter customer details:
   - Customer Name (optional)
   - Phone Number (required)
   - Additional notes (optional)
3. Save to create the customer record

### Uploading Images

1. Navigate to a customer's detail page
2. Use the image upload feature to add reference photos
3. Images are automatically optimized and stored in Cloudinary

### Managing Customer Records

- Use the search bar to quickly find customers
- Click on any customer card to view detailed information
- Edit customer details using the edit drawer
- Delete customers when no longer needed

## 🏗️ Project Structure

```
naap/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── _components/       # Reusable components
│   ├── _contexts/         # React Context providers
│   ├── login/            # Authentication page
│   └── naap/[id]/        # Individual customer pages
├── lib/                   # Utility libraries
│   ├── firebase/         # Firebase configurations
│   ├── types.ts          # Type definitions
│   └── utils.ts          # Helper functions
└── components/           # UI component library
```

## 🔧 Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Image Storage**: Cloudinary
- **UI Components**: Radix UI, Lucide React icons
- **Form Handling**: React Hook Form
- **Notifications**: Sonner

## 🎨 UI Components

The application uses a modern, responsive design with:

- Dark/light mode support
- Mobile-first approach
- Loading skeletons for better UX
- Accessible component design
- Toast notifications for user feedback

## 🔒 Security Features

- Authentication required for all data access
- User-specific data isolation
- Secure image uploads with validation
- Protected API routes

## 📊 Data Models

### Naap (Customer Record)

```typescript
type NaapDoc = {
  id: string;
  userId: string;
  customerName?: string;
  customerPhone: string;
  notes?: string;
  createdAt?: Date;
};
```

### Image Document

```typescript
type ImageDoc = {
  id: string;
  naapId: string;
  userId: string;
  cloudinaryId: string;
  url: string;
  createdAt: Date;
};
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Name Inspiration**: "Naap" meaning "measurement" in Urdu, reflecting the app's purpose for tailor shops
- **UI Components**: Built with shadcn/ui and Radix UI primitives
- **Icons**: Lucide React icon library
- **Deployment**: Optimized for Vercel platform

## 📞 Support

For support and questions:

- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**Naap** - Streamlining tailor shop management with modern web technology. 📏✂️
