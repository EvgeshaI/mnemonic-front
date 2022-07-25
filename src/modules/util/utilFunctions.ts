import moment from "moment";

export const isExpired = (created: string) => {
    let createdDate = moment(created, "DD-MM-YYYY HH:mm:ss")
    return createdDate.add(24, 'hours').isBefore(moment())
}
