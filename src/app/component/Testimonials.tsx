export default function Testimonials() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">What Users Say</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-600 mb-4">
                            "Carefinder made it so easy to find a hospital near me and book an appointment!"
                        </p>
                        <p className="font-semibold">— Aisha, Lagos</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-600 mb-4">
                            "The export feature is a lifesaver for sharing hospital info with my community."
                        </p>
                        <p className="font-semibold">— Chidi, Abuja</p>
                    </div>
                </div>
            </div>
        </section>
    );
}