module.exports.makeReply = (reply, isSuccess, code, message) => {
    reply.isSuccess = isSuccess;
    reply.code = code;
    reply.message = message;

    return reply;
}