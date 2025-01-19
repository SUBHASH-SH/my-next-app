export default function ContactUs() {
    return (
        <div className="grid grid-rows-auto items-start justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-gray-900">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">Contact Us</h1>
            <p className="text-justify mb-6">
                At <strong>SarkariNaukri-India.in</strong>, your feedback, queries, and suggestions matter to us. Whether you have a question about our website or need help with the latest <strong>sarkari naukri</strong> updates, feel free to get in touch. We’re here to assist you with all your questions related to <strong>sarkari result</strong>, <strong>sarkari exam</strong> preparation, and more.
            </p>
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">How to Reach Us</h2>
                <p className="mb-6">
                    <strong>Email:</strong> <a href="mailto:email@sarkarinaukri-india.in" className="text-blue-700 underline hover:no-underline">email@sarkarinaukri-india.in</a><br />
                    For general inquiries or to report any issues, send us an email, and we’ll respond as soon as possible. We’re always ready to help with your upcoming government exams and exam syllabus questions.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Social Media</h2>
                <p className="mb-4">
                    Stay updated with the latest job news and <strong>sarkari result</strong> notifications by following us on our social media platforms:
                </p>
                <ul className="list-none space-y-2 mb-6 sm:grid sm:grid-cols-2 sm:gap-4">
                    <li><a href="#" className="text-blue-700 underline hover:no-underline">Facebook</a></li>
                    <li><a href="#" className="text-blue-700 underline hover:no-underline">Telegram</a></li>
                    <li><a href="#" className="text-blue-700 underline hover:no-underline">YouTube</a></li>
                    <li><a href="#" className="text-blue-700 underline hover:no-underline">Instagram</a></li>
                </ul>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Suggestions and Feedback</h2>
                <p className="mb-6">
                    We are constantly working to improve our platform. Share your thoughts or suggestions at <a href="mailto:feedback@sarkarinaukri-india.in" className="text-blue-700 underline hover:no-underline">feedback@sarkarinaukri-india.in</a>, and help us serve you better. Your feedback is crucial to us as we aim to offer the most accurate and up-to-date information on <strong>sarkari exams</strong> and government job updates.
                </p>
            </section>
            <section>
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Address</h2>
                <p className="font-semibold">India</p>
            </section>
        </div>
    );
}