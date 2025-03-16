import { splitProps } from 'solid-js';

export function Avatar(props) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      class={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${local.class}`}
      {...rest}
    >
      {props.children}
    </div>
  );
}

export function AvatarImage(props) {
  const [local, rest] = splitProps(props, ['class', 'src', 'alt']);
  return (
    <img
      src={local.src}
      alt={local.alt}
      class={`aspect-square h-full w-full object-cover ${local.class}`}
      {...rest}
    />
  );
}

export function AvatarFallback(props) {
  const [local, rest] = splitProps(props, ['class']);
  return (
    <div
      class={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${local.class}`}
      {...rest}
    >
      {props.children}
    </div>
  );
}
