import { useEffect } from 'react';

const CustomCursor = () => {

    useEffect(() => {
        const cursor = document.querySelector('.cursor') as HTMLDivElement | null;
        const linksAndButtons = document.querySelectorAll('.link, .btn');

        const moveCursor = (e: MouseEvent) => {
            if (cursor) {
                cursor.style.top = e.pageY - 10 + 'px';
                cursor.style.left = e.pageX - 10 + 'px';
            }
        };

        const handleMouseEnter = () => {
            if (cursor) {
                cursor.classList.add('hovered');
            }
        };

        const handleMouseLeave = () => {
            if (cursor) {
                cursor.classList.remove('hovered');
            }
        };

        document.addEventListener('mousemove', moveCursor);

        linksAndButtons.forEach((element) => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', moveCursor);

            linksAndButtons.forEach((element) => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return <div className="cursor"></div>;
};

export default CustomCursor;