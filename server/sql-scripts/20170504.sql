CREATE TABLE `env_locations` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `env_types` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `icons` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `path` VARCHAR(128) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `node_types` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `icon_id` BIGINT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `node_types_icon_id_icons_id_idx` (`icon_id` ASC),
  CONSTRAINT `node_types_icon_id_icons_id`
    FOREIGN KEY (`icon_id`)
    REFERENCES `fo`.`icons` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

CREATE TABLE `environments` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `env_location_id` BIGINT NULL,
  `env_type_id` BIGINT NULL,
  `icon_id` BIGINT NULL,
  `notes` VARCHAR(1024) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `environments_env_location_id_env_locations_id_idx` (`env_location_id` ASC),
  INDEX `environments_icon_id_icons_id_idx` (`icon_id` ASC),
  INDEX `environments_env_type_id_env_types_id_idx` (`env_type_id` ASC),
  CONSTRAINT `environments_env_location_id_env_locations_id`
    FOREIGN KEY (`env_location_id`)
    REFERENCES `fo`.`env_locations` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `environments_env_type_id_env_types_id`
    FOREIGN KEY (`env_type_id`)
    REFERENCES `fo`.`env_types` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `environments_icon_id_icons_id`
    FOREIGN KEY (`icon_id`)
    REFERENCES `fo`.`icons` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

CREATE TABLE `nodes` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `address` VARCHAR(128) NULL,
  `env_id` BIGINT NULL,
  `universal_identifier` VARCHAR(128) NULL,
  `universal_environment` VARCHAR(128) NULL,
  `node_type_id` BIGINT NULL,
  `notes` VARCHAR(1024) NULL,
  `os` VARCHAR(128) NULL,
  `ram` VARCHAR(128) NULL,
  `disk` VARCHAR(128) NULL,
  `cpu` VARCHAR(128) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `nodes_env_id_environments_id_idx` (`env_id` ASC),
  INDEX `nodes_node_type_id_node_types_id_idx` (`node_type_id` ASC),
  CONSTRAINT `nodes_env_id_environments_id`
    FOREIGN KEY (`env_id`)
    REFERENCES `fo`.`environments` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `nodes_node_type_id_node_types_id`
    FOREIGN KEY (`node_type_id`)
    REFERENCES `fo`.`node_types` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);

CREATE TABLE `configurations` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(128) NULL,
  `value` VARCHAR(128) NULL,
  `notes` VARCHAR(1024) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `key_UNIQUE` (`key` ASC));
  
CREATE TABLE `metrics` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NULL,
  `universal_identifier` VARCHAR(128) NULL,
  `threshold_warning` DECIMAL(3,2) NULL,
  `threshold_critical` DECIMAL(3,2) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));
