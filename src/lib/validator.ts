class Validator {
    static isNumValid(num: number) {
        if (num >= 70){
            return false
        } else if (num <= 10) {
            return false
        } else{
            return true
        }
    }
}


export { Validator }