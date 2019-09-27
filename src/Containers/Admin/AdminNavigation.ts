//routers on sidebar
const navigation = (intl: any) => {
  return [
    {
      name: intl.formatMessage({id: 'todo'}),
      url: '/admin',
      icon: 'icon-speedometer',
    }
  ]
};

export {navigation};