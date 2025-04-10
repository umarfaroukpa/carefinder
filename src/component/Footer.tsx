export default function Footer() {
    return (
        <footer className="bg-[#056968] text-white py-8">
            <div className="container mx-auto text-center">
                <p className="mb-4">© 2025 Carefinder. All rights reserved.</p>
                <div className="space-x-4">
                    <a href="/about" className="hover:underline">About</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}