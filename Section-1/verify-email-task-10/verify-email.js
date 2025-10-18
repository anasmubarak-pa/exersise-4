function verifyEmail(mailid)
{
    if((/\w+@\w+\.\w+/).test(mailid))
    {
        return true
    }
    return false
}

console.log(verifyEmail("test@example.com"))
console.log(verifyEmail("invalid.email.com"))
console.log(verifyEmail("user@domain"))