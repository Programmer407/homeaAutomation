// libs
import React from 'react'
import Snackbar from 'material-ui/Snackbar'

const iSnackbar = props => {
	const { isSnackbarOpen, snackMessage, autoHideDuration, onSnackbarClose } = props

	return (
		<Snackbar
			open={ isSnackbarOpen }
			message={ message }
			autoHideDuration={ autoHideDuration ? autoHideDuration : 4000 }
			onRequestClose={ onSnackbarClose }/>
	)
}

export default iSnackbar