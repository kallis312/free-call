import { httpsServer } from '@Conf/express'
import socket from '@Conf/socket'

socket(httpsServer)

const PORT = process.env.PORT || 8080

httpsServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
