import { httpsServer, httpServer } from '@Conf/express'
import socket from '@Conf/socket'

socket(httpsServer)
socket(httpServer)

const PORT = process.env.PORT || 80

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
