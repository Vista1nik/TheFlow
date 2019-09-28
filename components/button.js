export default (props) => (
    <div>
        <style jsx>{`
            a {
                padding: ${props.width} 32px;
                background-color: ${props.bgColor};
                color: #fff;
                border-radius: 8px;
                border: 1px solid ${props.bgColor};
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease 0s;
            }

            a:hover {
                background-color: rgba(0,0,0,0);
                border: 1px solid ${props.bgColor};
                border-radius: 8px;
                color: ${props.bgColor};
            }    
        `}</style>
        <a>{props.children}</a>
    </div>
) 