import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Image } from '@react-pdf/renderer';

import sucreLogo from '../../../assets/LogoSucreBill.png'
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'100%'
  },
  mainContainer:{
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontSize:'1.7cm',
    width:'90%',
    height:'75%',
    borderTop:'2cm',
    borderBottom:'2cm',
    borderRight:'0.2cm',
    borderLeft:'0.2cm',
    borderTopColor:'#5293C1',
    borderBottomColor:'#5293C1',
  },
  sectionSuperior: {
    flexDirection:'row'
  },
  title:{
    color:'#787575',
    fontSize:'2.5cm',
    marginBottom:'1cm'

  },
  subSectionSuperior:{
    width:'33%',
    flexDirection:'column',
  },
  textSectionSuperior:{
    width:'33%',
    flexDirection:'column',
    marginTop:'5cm',
    marginLeft:'5cm'
    
  },
  customerContainer:{
    marginTop:'5cm',
    height:'auto'
  },
  tableContainer:{
    height:'65%'
  },
  companyName:{
    fontSize:'2.6cm',
    marginTop:'1cm'
  },
  contactContainer:{
    marginTop:'14cm',
    marginBottom:'5cm'
  },
  contactText:{
    marginBottom:'4cm'
  },
  link:{
    color:'#1a05ff',
    marginBottom:'4cm'
  },table: { 
    display: "table", 
    width: "90%", 
    borderStyle: "solid",   
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: '1cm', 
    borderTop:'0',
    borderBottom:'0.3cm',
    borderRight:'0',
    borderLeft:'0'
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize:'1.7cm',
    width:'auto'
  },
  tableColHeader: { 
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: '0.5cm',
    borderTop:'0',
    borderLeft:'0',
    borderRight:'0',
  }, 
  tableCellHeader: { 
    margin: "auto", 
    marginTop: 5, 
    color:'#787575',
    fontSize:'2.5cm',
  },
  tableRowHeader: {
    margin: "auto", 
    flexDirection: "row",
    marginBottom: '2cm'
  },
  trackingHeader:{
    width: "50%", 
    borderStyle: "solid", 
    borderWidth: '0.5cm',
    borderTop:'0',
    borderLeft:'0',
    borderRight:'0',
  },
  trackingCol:{
    width: "50%",
    borderTop:'0',
    borderBottom:'0.3cm',
    borderRight:'0',
    borderLeft:'0'
  },
  trackingCell:{
    margin: "auto", 
    marginTop: 5, 
    fontSize:'1.7cm',
    width:'auto'
  },
  totalPrice:{
    fontSize:'4cm',
    color:'#5293C1',
    marginTop:'0.5cm'
  },
  totalSection:{
    marginBottom:'2cm',
    marginLeft:'2cm'
  }, dateStr:{
    marginTop:'1cm'
  },
  bottomSection:{
    flexDirection:'row'
  },
  detailsSection:{
    marginLeft:'40cm',
    flexDirection:'row'

  },
  textDetail:{
    marginBottom: '2cm',
    marginRight:'5cm'
  } 


});
const BillPdf = (props) => {
    const date = new Date(Date.now()) 
    const dateStr = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    return(
        <Document title={props.billID} >
        <Page size="A0" style={styles.page}>
        <View style={styles.mainContainer}>
        <View style={styles.sectionSuperior}>
          <View style={styles.textSectionSuperior}>
            <View>
              <Text style={styles.title}>Número de factura</Text>
              <Text>{props.billID}</Text>
            </View>
            <View style={styles.customerContainer}>
              <Text style={styles.title}>Cliente</Text>
              <Text>{`${props.customer.firstName} ${props.customer.lastName}`}</Text>
              <Text>{props.customer.address}</Text>
              <Text>{`Télefono: ${props.customer.phoneNumber}`}</Text>
            </View>
          </View>
          <View style={styles.textSectionSuperior}>
            <Text style={styles.title}>Fecha</Text>
            <Text style={styles.dateStr}>{dateStr}</Text>
            <Text style={styles.companyName}>Sucre Express Inc.</Text>
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>Telf: 205-2118</Text>
              <Text style={styles.contactText}>Whatsapp: 6919-8012</Text>
              <Link style={styles.link} src='mailto:info1@sucrexpresszl.com'>info1@sucrexpresszl.com</Link>
              <Link style={styles.link} src='https://www.sucrexpress.com/'>www.sucrexpress.com</Link>
            </View>
          </View>
          <View style={styles.subSectionSuperior}>
            <Image src={sucreLogo} />
          </View>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
                <View style={styles.trackingHeader}>
                  <Text style={styles.tableCellHeader}>{'Tracking'}</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>{'Precio'}</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>{'Peso'}</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>{'Total'}</Text>
                </View>
              </View>
            {props.packages.map(item=>(
              <View style={styles.tableRow}>
              <View style={styles.trackingCol}>
                <Text style={styles.trackingCell}>{item.tracking}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{props.lblPrice}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.weight}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.price}</Text>
              </View>
            </View>
            ))}
            </View>
          </View>
            <View style={styles.bottomSection}>
              <View style={styles.totalSection}>
                <Text style={styles.title}>Total de la factura</Text>
                <Text style={styles.totalPrice}>{`$ ${props.total.toFixed(2)}`}</Text>
              </View>
              <View style={styles.detailsSection}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.textDetail}>SUBTOTAL</Text>
                  <Text style={styles.textDetail}>Descuentos</Text>
                  <Text style={styles.textDetail}>Impuestos</Text>
                  <Text style={styles.textDetail}>TOTAL</Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.textDetail}>{`$  ${(parseFloat(props.total) + parseFloat(props.discount)).toFixed(2)}`}</Text>
                  <Text style={styles.textDetail}>{`$  ${props.discount == '0.00' ? '-' : props.discount}`}</Text>
                  <Text style={styles.textDetail}>{'$  -'}</Text>
                  <Text style={styles.textDetail}>{`$  ${props.total.toFixed(2)}`}</Text>
                </View>
              </View>
            </View>
        </View>
          </Page>
        </Document>
      );
}

export default BillPdf;