import { useEffect, useState } from 'react';

export default function useMenuCollapse() {
    const [collapsed, setCollapsed] = useState(
        localStorage.getItem('menuCollapsed') === 'true' || false,
    );

    function toggleMenu() {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        localStorage.setItem('menuCollapsed', collapsed.toString());
    });

    return {
        collapsed,
        toggleMenu,
    };
}
