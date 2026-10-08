type HeaderProps = {
    title: string;
    description: string;
};

export function Header(props: HeaderProps) {
    const { title, description } = props;

    return (
        <header className="header">
            <div className="header-container">
                <h1 className="header-title">{title}</h1>
                <p className="header-subtitle">{description}</p>
            </div>
        </header>
    );
}