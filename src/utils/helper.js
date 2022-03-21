const { XMLParser } = require('fast-xml-parser');
const _ = require('lodash');

const parseXML = (data) => {
    const parser = new XMLParser();
    return parser.parse(data);
}

const mapKafkaMessage = (data) => {
    const rates = parseXML(data).Tarih_Date.Currency;
    return _.map(rates, item => { return { Name: item.CurrencyName, Value: item.ForexBuying}});
}

module.exports = { parseXML, mapKafkaMessage }