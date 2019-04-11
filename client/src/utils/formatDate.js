import moment from 'moment'

const formatDate = date => moment(date, [moment.ISO_8601]).format('MM/DD/YYYY')

export default formatDate
