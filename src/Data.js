import uuidv4 from 'uuid/v4'


const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();

// all ins should be the same for all.. like 300,300
// TODO: match 300,300 in  with mecano state X and Y
// bounds can all be 0


var Data = {

    'ids':[
    id1,id2,id3
    ],

    'items':[
        {   
            'key':id1,
            'type':'Input2d',
            'name':'someName',
            'size': {
                'X':200,
                'Y':200
            },
            'bounds': {
                'min':{
                    'X':0,
                    'Y':0
                },
                'max':{
                    'X':0,
                    'Y':0
                }
            },
            'in':{
                'X':300,
                'Y':300
            },
            'out':[
                {
                    'X':20,
                    'Y':20
                },
                {
                    'X':100,
                    'Y':100
                }
            ]
        },
        {   
            'key':id2,
            'type':'Input2d',
            'name':'someName',
            'size': {
                'X':100,
                'Y':100
            },
            'bounds': {
                'min':{
                    'X':0,
                    'Y':0
                },
                'max':{
                    'X':0,
                    'Y':0
                }
            },
            'in':{
                'X':300,
                'Y':300
            },
            'out':[
                {
                    'X':0,
                    'Y':0
                }
                ]
        }
        ,
        {   
            'key':id3,
            'type':'Input2d',
            'name':'someName',
            'size': {
                'X':100,
                'Y':100
            },
            'bounds': {
                'min':{
                    'X':0,
                    'Y':0
                },
                'max':{
                    'X':0,
                    'Y':0
                }
            },
            'in':{
                'X':300,
                'Y':300
            },
            'out':[
                {
                    'X':0,
                    'Y':0
                }
                ]
        }
    ]
};

export default Data;


