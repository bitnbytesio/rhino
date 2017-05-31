const modules = [

    {
        selector: 'users',
        name: 'users',
        controller: 'usersCtrl',
        template: 'user/list.html',
        deps: []
    },
    function () { /* module handler function */
    }
];

export { modules };