import zerorpc

class RPCHandler(object):
    def __init__(self):
        print("Running RPCHandler...")

    @staticmethod
    def runner(name):
        return "Message Sent from {}".format(name)

s = zerorpc.Server(RPCHandler)
s.bind("tcp://0.0.0.0:4242")
s.run()