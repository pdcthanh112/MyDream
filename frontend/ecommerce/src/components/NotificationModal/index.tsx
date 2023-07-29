import { useAppSelector } from '@redux/store';
import { Customer } from '@models/CustomerModel';
import { useQuery } from '@tanstack/react-query';
import { getNotificationByCustomer } from '@apis/notificationApi';
import { Notification } from '@models/NotificationModel';


export default function NotificationModal() {
  const currentUser: Customer = useAppSelector((state) => state.auth.login.currentUser);

  const { data: listNotification, isLoading } = useQuery(
    ['listNotification'],
    async () => await getNotificationByCustomer(currentUser.userData.accountId).then((response) => response.data)
  );

  if (isLoading) return <>Loading...</>;

  return (
    <div className="p-2">
      <div>
        <span className="font-semibold text-lg">Notification</span>
      </div>
      {listNotification.map((item: Notification) => (
        <div key={item.id}>
          <div>{item.title}</div>
          <div>{item.content}</div>
        </div>
      ))}
    </div>
  );
}
