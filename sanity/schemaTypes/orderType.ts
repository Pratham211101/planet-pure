import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: 'order',
    title: 'Orders',
    type: 'document',
    icon:BasketIcon,
    fields: [
        defineField({
            name:"orderNumber",
            title:"order number",
            type:"string",
            validation:(Rule)=>Rule.required()
        }),
        defineField({
            name:"stripeCheckoutSessionId",
            title:"stripe checkout session ID",
            type:"string",
        }),
        defineField({
            name:"stripeCustomerId",
            title:"stripe customer ID",
            type:"string",
            validation:(Rule)=>Rule.required()
        }),
        defineField({
            name:"customerName",
            title:"customer name",
            type:"string",
            validation:(Rule)=>Rule.required()
        }),
        defineField({
            name:"email",
            title:"customer email",
            type:"string",
            validation:(Rule)=>Rule.required().email()
        }),
        defineField({
            name:"stripePaymentIntentId",
            title:"stripe payment intent ID",
            type:"string",
            validation:(Rule)=>Rule.required()
        }),
        defineField({
            name:"product",
            title:"products",
            type:"array",
            of:[
                defineArrayMember({
                    type:"object",
                    fields:[
                        defineField({
                            name:"product",
                            title:"product biught",
                            type:"reference",
                            to:[{type:"product"}]
                        }),
                        defineField({
                            name:"quantity",
                            title:"quantity purchased",
                            type:"number",
                        }),
                    ],
                    preview:{
                        select:{
                            product:"product.name",
                            quantity:"quantity",
                            image:"product.image",
                            price:"product.price",
                            currency:"product.currency"
                        },
                        prepare(select){
                            return{
                                title:`${select.product} x ${select.quantity}`,
                                subtitle:`${select.price * select.currency}`,
                                media:select.image
                            }
                        }
                    }
                })
            ]
        }),
        defineField({
            name:"totalPrice",
            title:"total price",
            type:"number",
            validation:(Rule)=>Rule.required().min(0)
        }),
        defineField({
            name:"currency",
            title:"currency",
            type:"string",
            validation:(Rule)=>Rule.required()
        }),
        defineField({
            name:"amountDiscount",
            title:"amount discount",
            type:"number",
            validation:(Rule)=>Rule.min(0)
        }),
        defineField({
            name:"status",
            title:"order status",
            type:"string",
            options:{
                list:[
                    {title:"pending",value:"pending"},
                    {title:"paid",value:"paid"},
                    {title:"shipped",value:"shipped"},
                    {title:"delivered",value:"delivered"},
                    {title:"cancelled",value:"cancelled"},
                ]
            }
        }),
        defineField({
            name:"orderDate",
            title:"order date",
            type:"datetime",
            validation:(Rule)=>Rule.required()
        }),
    ],
    preview:{
        select:{
            name:"customerName",
            amount:"totalPrice",
            currency:"currency",
            orderId:"orderNumber",
            email:"email"
        },
        prepare(select){
            const orderIdSnippet = `${select.orderId.slice(0,5)}...${select.orderId.slice(-5)}`
            return{
                title:`${select.name}  ${orderIdSnippet}`,
                subtitle:`${select.amount} ${select.currency}, ${select.email}`,
                media:BasketIcon
            }
        }
    }
})