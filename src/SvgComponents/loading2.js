export const Loading2 = () => {
	return(
			<svg version="1.1" 
			width="32" height="8"
			 >
				<circle fill="#7490f4"  cy="4"  cx="4"  r="3">
				<animate
				attributeName="opacity"
				dur="1s"
				values="0;1;0"
				repeatCount="indefinite"
				begin="0.1"/>    
				</circle>
				<circle fill="#7490f4"  cy="4" cx="12" r="3">
				<animate
				attributeName="opacity"
				dur="1s"
				values="0;1;0"
				repeatCount="indefinite" 
				begin="0.2"/>       
				</circle>
				<circle fill="#7490f4"  cy="4" cx="20" r="3">
				<animate
				attributeName="opacity"
				dur="1s"
				values="0;1;0"
				repeatCount="indefinite" 
				begin="0.3"/>     
				</circle>
			</svg>
	)
}