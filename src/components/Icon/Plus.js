import PropTypes from 'prop-types'

export default function Plus({color = '#ffffff', size = '24px'}) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      color={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
  )
}
Plus.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}
