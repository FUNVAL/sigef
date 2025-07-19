export default function VideoSection() {
    return (
        <section id="video" className="video bg-white bg-cover bg-center bg-no-repeat py-16 text-gray-900">
            <div className="flex flex-col items-center gap-[100px] px-4">
                {/* Video Card 1 */}
                <div className="relative w-[55%]">
                    <div className="video-banner relative z-50 overflow-hidden rounded-tr-[80px] rounded-bl-[120px]">
                        <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />
                        <iframe src="https://www.youtube.com/embed/uDJZYx_oqU0" className="aspect-[16/9] w-full" title="Video 1" allowFullScreen />
                    </div>

                    <img
                        src="images/video-shape-1.png"
                        alt="imagen-shape"
                        loading="lazy"
                        className="absolute bottom-[-40px] left-[-150px] h-auto w-[100%] max-w-[1089px]"
                    />

                    <img src="images/video-shape-2.png" alt="" loading="lazy" className="absolute -top-[80px] right-[-10px] z-[1] w-[13%]" />
                </div>

                {/* Video Card 2 */}
                <div className="relative w-[55%]">
                    <div className="video-banner relative z-50 overflow-hidden rounded-tr-[80px] rounded-bl-[120px] border border-gray-200 shadow-lg">
                        <iframe src="https://www.youtube.com/embed/aDComfZBa-U" className="aspect-[16/9] w-full" title="Video 2" allowFullScreen />
                    </div>

                    <img
                        src="images/video-shape-1.png"
                        alt=""
                        loading="lazy"
                        className="absolute bottom-[-40px] left-[-150px] z-[+1] h-auto w-[100%] max-w-[1089px]"
                    />

                    <img src="images/video-shape-2.png" alt="" loading="lazy" className="absolute -top-[80px] right-[-10px] z-[1] w-[13%]" />
                </div>
            </div>
        </section>
    );
}
