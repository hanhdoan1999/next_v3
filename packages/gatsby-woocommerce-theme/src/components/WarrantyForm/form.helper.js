const inputName = [
    {
        id:3.3,
        name: "first",
    },
    {
        id:3.6,
        name: "last",
    },
    {
        id:4,
        name:"company"
    },
    {
        id:5,
        name:"phone",
    },
    {
        id:6,
        name:"email",
    },
    {
        id:7.1,
        name:"street",
    },
    {
        id:7.2,
        name:"lineTwo",
    },
    {
        id:7.3,
        name:"city",
    },
    {
        id:7.4,
        name:"state",
    },
    {
        id:7.5,
        name:"zip",
    },
    {
        id:7.6,
        name:"country",
    },
    {
        id:9,
        name:"invoiceNum",
    },
    {
        id:10,
        name:"productDetailAndQty",
    },
    {
        id:11,
        name:"productFaultDetail",
    },
    {
        id:12,
        name:"enviroment",
    },
    {
        id:14,
        name:"productFaultImage",
    },
    {
        id:15,
        name:"productLocationImage",
    },
    {
        id:17,
        name:"other",
    },
    {
        id:18,
        name:"consent",
    },
]

export const checkName = (id) => {
    if(id) {
        const tempName = inputName.find(el => el.id === id).name
        return tempName
    }
}