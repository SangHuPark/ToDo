exports.makeReply = (reply, isSuccess, code, message) => {
    reply.isSuccess = isSuccess;
    reply.code = code;
    reply.message = message;

    return reply;
}

exports.tokenReply = (tokenReply, isSuccess, code, message, data ) => {
    tokenReply.isSuccess = isSuccess;
    tokenReply.code = code;
    tokenReply.message = message;
    tokenReply.data = data;

    return tokenReply;
}