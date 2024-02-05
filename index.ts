import { httpsServer, httpServer } from '@Conf/express'
import socket from '@Conf/socket'

socket(httpsServer)
socket(httpServer)

const HTTP_PORT = process.env.HTTP_PORT || 80
const HTTPS_PORT = process.env.HTTPS_PORT || 443

httpServer.listen(HTTP_PORT, () => console.log(`Http Server is running on port ${HTTP_PORT}`))
httpsServer.listen(HTTPS_PORT, () => console.log(`Http Server is running on port ${HTTPS_PORT}`))
