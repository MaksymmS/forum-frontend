import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../api/baseApi';
import type { RegisterFormData } from '../types/auth';

type RegisterFormProps = {
  onSuccess?: () => void;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerUser(data);

      if (result.data) {
        alert(`Реєстрація успішна! Ласкаво просимо, ${result.data.email}`);
        reset();
        onSuccess?.();
      } else if (result.error) {
        const errorData = result.error as any;
        const message = errorData?.data?.message || 'Сталася помилка під час реєстрації';
        alert(`Помилка реєстрації: ${message}`);
      }
    } catch (err: any) {
      alert(`Помилка: ${err?.message || 'Щось пішло не так'}`);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="auth-form-title">Створити акаунт</h3>

      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          placeholder="example@mail.com"
          autoComplete="email"
          {...register('email', {
            required: "Email обов'язковий",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Введіть коректний email адрес',
            },
          })}
        />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="register-password">Пароль</label>
        <input
          id="register-password"
          type="password"
          placeholder="Мінімум 8 символів"
          autoComplete="new-password"
          {...register('password', {
            required: "Пароль обов'язковий",
            minLength: {
              value: 8,
              message: 'Пароль повинен містити щонайменше 8 символів',
            },
          })}
        />
        {errors.password && <span className="form-error">{errors.password.message}</span>}
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
      </button>
    </form>
  );
}
