import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../api/baseApi';
import type { LoginFormData } from '../types/auth';

type LoginFormProps = {
  onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [loginUser, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);

      if (result.data) {
        alert('Авторизація успішна!');
        reset();
        onSuccess?.();
      } else if (result.error) {
        const errorData = result.error as any;
        const message = errorData?.data?.message || 'Невірний email або пароль';
        alert(`Помилка авторизації: ${message}`);
      }
    } catch (err: any) {
      alert(`Помилка: ${err?.message || 'Щось пішло не так'}`);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="auth-form-title">Вхід до акаунту</h3>

      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
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
        <label htmlFor="login-password">Пароль</label>
        <input
          id="login-password"
          type="password"
          placeholder="Введіть пароль"
          autoComplete="current-password"
          {...register('password', {
            required: "Пароль обов'язковий",
          })}
        />
        {errors.password && <span className="form-error">{errors.password.message}</span>}
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Вхід...' : 'Увійти'}
      </button>
    </form>
  );
}
