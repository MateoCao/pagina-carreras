import Image from "next/image"

export const LoadingScreen = () => {
    return(
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black">
            <Image 
                className="animate-pulse" 
                src="/logo-tc2000.png" 
                alt="Logo" 
                width={600} 
                height={300} 
            />
        </div>
    )
}