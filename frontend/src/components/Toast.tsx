import { useEffect, useState } from "react";

interface ToastProps {
	message: string;
	onClose: () => void;
}

function Toast( {message, onClose} : ToastProps)
{

	const [visible, setVisible] = useState(true);
	const [closing, setClosing] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(false);
			setClosing(true);
			onClose();
		}, 3000);

		return () => {
			clearTimeout(timeout);
			setClosing(false);
		};
	}, []);

	if( !visible )
	{
		return null;
	}

	return (
			<div className={`toast ${closing ? "toast--closing" : ""}`}>
				<p>{message}</p>
			</div>
	);

}

export default Toast;