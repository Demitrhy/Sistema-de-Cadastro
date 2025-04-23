import React from 'react';

const Navbar: React.FC = () => {
    const styles = {
        navbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', /* sombra leve, opcional */
            border: 'none', /* importante: sem borda */
            backgroundColor: '#fff',
        },
        navbarLeft: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
        },
        logo: {
            fontWeight: 'bold',
            fontSize: '20px',
        },
        logoSpan: {
            color: '#007bff',
        },
        title: {
            fontWeight: 'bold',
            fontSize: '18px',
        },

        link: {
            textDecoration: 'none',
            color: '#333',
        },
        badge: {
            backgroundColor: '#001a80',
            color: 'white',
            borderRadius: '20px',
            padding: '5px 10px',
            fontSize: '14px',
        },
        avatar: {
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#001a80',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold' as const,
        },
    };

    return (
        <div style={styles.navbar}>
            <div style={styles.navbarLeft}>
                <div style={styles.logo}>
                    <span style={{
                        fontFamily: 'monospace',
                        fontSize: '1.5rem',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'
                    }}>
                        <span style={{ color: 'black' }}>{"<"}</span>
                        <strong style={{ color: '#007bff' }}>Gustavo</strong>
                        <span style={{ color: 'black' }}>/&gt;</span>
                    </span>

                </div>
                <div style={styles.title}>Product Management System</div>
            </div>
            <div style={styles.avatar}>M</div>
        </div>
    );
};

export default Navbar;
