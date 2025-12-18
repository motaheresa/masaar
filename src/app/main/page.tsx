import HomeNavbar from '@/components/organisms/navbar/HomeNavbar'
import CreateProjectForm from '@/features/main/components/organisms/CreateProjectForm'
import CreateProjectTitle from '@/features/main/components/organisms/CreateProjectTitle'
import mainBg from '@/assets/images/main-bg.jpg'

const page = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${mainBg.src})` }}
        >
            {/* Navbar */}
            <HomeNavbar />

            {/* Content */}
            <main className="w-full max-w-3xl mx-auto px-4 py-12 pt-10">
                {/* Header */}
                <CreateProjectTitle />

                {/* Form */}
                <CreateProjectForm />

            </main>
        </div>
    )
}

export default page