import React from "react"

export default function VideoSection() {
    return (
        <section
            id="video"
            className="video bg-white text-gray-900 bg-no-repeat bg-cover bg-center py-16"
        >
            <div className="flex flex-col items-center gap-[100px] px-4">
                {/* Video Card 1 */}
                <div className="relative w-[55%] ">
                    <div className="video-banner relative rounded-tr-[80px] rounded-bl-[120px] overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
                        <iframe
                            src="https://www.youtube.com/embed/uDJZYx_oqU0"
                            className="w-full aspect-[16/9]"
                            title="Video 1"
                            allowFullScreen
                        />
                    </div>

                    <img
                        src="images/video-shape-1.png"
                        alt="imagen-shape"
                        loading="lazy"
                        className=" absolute bottom-[-40px] left-[-150px] z-[+1] w-[100%] max-w-[1089px] h-auto"
                    />

                    <img
                        src="images/video-shape-2.png"
                        alt=""
                        loading="lazy"
                        className="absolute -top-[80px] right-[-10px] z-[1] w-[13%]"
                    />
                </div>

                {/* Video Card 2 */}
                <div className="relative w-[55%]">
                    <div className="video-banner relative rounded-tr-[80px] rounded-bl-[120px] overflow-hidden shadow-lg border border-gray-200">
                        <iframe
                            src="https://www.youtube.com/embed/aDComfZBa-U"
                            className="w-full aspect-[16/9]"
                            title="Video 2"
                            allowFullScreen
                        />
                    </div>


                    <img
                        src="images/video-shape-1.png"
                        alt=""
                        loading="lazy"
                        className="absolute bottom-[-40px] left-[-150px] z-[+1] w-[100%] max-w-[1089px] h-auto"
                    />

                    <img
                        src="images/video-shape-2.png"
                        alt=""
                        loading="lazy"
                        className="absolute -top-[80px] right-[-10px] z-[1] w-[13%]"
                    />
                </div>
            </div>
        </section>
    )
}
