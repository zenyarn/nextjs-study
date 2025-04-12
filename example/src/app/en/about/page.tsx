import Link from "next/link";

export default function EnglishAboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>

      <p className="mb-4">
        Welcome to our company! We are dedicated to providing the best products
        and services to our customers.
      </p>

      <p className="mb-4">
        Our team consists of passionate individuals who are committed to
        excellence and innovation.
      </p>

      <p className="mb-8">
        Whether you're looking for cutting-edge technology or reliable
        solutions, we've got you covered.
      </p>

      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
